import React from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './../stylesheets/product-manager.css'

const linkFakeAPI = 'http://localhost:2000/products'

class ListProducts extends React.Component{
    state = {
        data : null,
        showForm : false,
        selectedId : null,
        warningProduct : '',
        warningPrice : '',
        warningStock : '',
        warningCategory : '',
        warningUrl : ''
    }

    onGetData = () => {
        Axios.get(linkFakeAPI)

        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.onGetData()
    }

    onSaveClick = () => {
        // 1. Ambil Semua Value dari Inputs
        // 2. Validasi Input Apakah Ada yang Kosong atau Tidak
        // 3. Validasi Nama Produk (Duplikat atau Tidak)
        // 4. Kirim ke API

        // Step 1.
        var editProduct = this.refs.editProduct.value
        var editPrice = this.refs.editPrice.value
        var editStock = this.refs.editStock.value
        var editCategory = this.refs.editCategory.value
        var editImage = this.refs.editImage.value
        
        // Step 2.
        if(editProduct === ''){
            this.setState({warningProduct : 'Data must be filled!'})
        }else if(editProduct !== ''){
            this.setState({warningProduct : ''})
        }
        
        if(editPrice === ''){
            this.setState({warningPrice : 'Data must be filled!'})
        }else if(editPrice !== ''){
            this.setState({warningPrice : ''})
        }
        
        if(editStock === ''){
            this.setState({warningStock : 'Data must be filled!'})
        }else if(editStock !== ''){
            this.setState({warningStock : ''})
        }
        
        if(editCategory === ''){
            this.setState({warningCategory : 'Data must be filled!'})
        }else if(editCategory !== ''){
            this.setState({warningCategory : ''})
        }
        
        if(editImage === ''){
            this.setState({warningUrl : 'Data must be filled!'})
        }else if(editImage !== ''){
            this.setState({warningUrl : ''})
        }

        if(editProduct && editPrice && editStock && editCategory && editImage){
            // Step 3.
            var checkValidation = this.state.data.some(products => products.product === editProduct)
            if(checkValidation){
                this.setState({warningProduct : 'The Product Already Exist!'})
            }else{
                //Step 4.
                Axios.patch(linkFakeAPI + '/' + this.state.selectedId, {product : editProduct, price : editPrice, stock : editStock, category : editCategory, image : editImage})
                .then((res) => {
                    console.log(res)
                    if(res.status === 200){
                        alert('Edit Product Successfull!')
                        this.setState({selectedId : null})
                        this.setState({warning : ''})
                        this.onGetData()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    onDeleteClick = (id) => {
        Axios.delete('http://localhost:2000/products/' + id)
        .then((res) => {
            console.log(res)
            if(res.status === 200){
                alert('The Product Has Been Deleted!')
                this.onGetData()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapDataProducts = () => {
        return this.state.data.map((val) => {
            if(this.state.selectedId === val.id){
                return(
                    <div className="col-10 col-md-3 px-4 py-2 my-card">
                        <div className="row justify-content-center mb-2 border">
                            <div className="col-12 col-md-12 py-3 px-md-2 py-md-2">
                                <img src={val.image} alt="PhotoProduct" width="100%" />
                            </div>
                            <div className="col-10 col-md-12 px-2 pt-2">
                                <input type="text" placeholder="Name of product" ref="editProduct" defaultValue={val.product} className="form-control rounded-0" />
                                <div className="warning">{this.state.warningProduct}</div>
                            </div>
                            <div className="col-10 col-md-12 px-2 py-2">
                                <input type="text" placeholder="Price of product" ref="editPrice" defaultValue={val.price} className="form-control rounded-0" />
                                <div className="warning">{this.state.warningPrice}</div>
                            </div>
                            <div className="row align-items-center col-10 col-md-12 px-2">    
                                <div className="col-4 col-md-4 px-0">
                                    <span><b>Stock</b></span>
                                </div>
                                <div className="col-8 col-md-8 px-0">
                                    <input type="text" placeholder="Stock of product" ref="editStock" defaultValue={val.stock} className="form-control rounded-0" />
                                    <div className="warning">{this.state.warningStock}</div>
                                </div>
                            </div>
                            <div className="row col-10 col-md-12 px-2 pb-2">    
                                <div className="col-4 col-md-4 px-0">
                                    <span><b>Category</b></span>
                                </div>
                                <div className="col-8 col-md-8 px-0">
                                    <select className="custom-select mt-3" ref="editCategory" defaultValue={val.category} size="3">
                                        <option value="Football Boots">Football Boots</option>
                                        <option value="Futsal Boots">Futsal Boots</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="warning">{this.state.warningCategory}</div>
                                </div>
                            </div>
                            <div className="row align-items-center col-10 col-md-12 px-2">    
                                <div className="col-4 col-md-4 px-0">
                                    <span><b>URL Photo</b></span>
                                </div>
                                <div className="col-8 col-md-8 px-0">
                                    <input type="text" placeholder="(Url of product)" ref="editImage" defaultValue={val.image} className="form-control rounded-0" />
                                    <div className="warning">{this.state.warningUrl}</div>
                                </div>
                            </div>
                            <div className="col-10 col-md-12 px-2 pt-2">
                                <input type="button" value="Submit" onClick={this.onSaveClick} className="btn btn-success w-100 py-1 mb-2 rounded-0"/>
                                <input type="button" value="Cancel" onClick={() => this.setState({selectedId : null})} className="btn btn-danger w-100 py-1 mb-2 rounded-0"/>
                            </div>
                        </div>
                    </div>
                )
            }
            return(
                <div className="col-10 col-md-3 px-4 py-2 my-card">
                    <div className="row justify-content-center mb-2 border">
                        <div className="col-12 col-md-12 py-3 px-md-2 py-md-2">
                            <img src={val.image} alt="PhotoProduct" width="100%" />
                        </div>
                        <div className="col-10 col-md-12 px-2 pt-2">
                            <h6>{val.product}</h6>
                        </div>
                        <div className="col-10 col-md-12 px-2 py-0">
                            <h6>{val.price}</h6>
                        </div>
                        <div className="row col-10 col-md-12 px-2">    
                            <div className="col-4 col-md-4 px-0">
                                <span><b>Stock</b></span>
                            </div>
                            <div className="col-8 col-md-8 px-0">
                                <span>: {val.stock}</span>
                            </div>
                        </div>
                        <div className="row col-10 col-md-12 px-2 pb-2">    
                            <div className="col-4 col-md-4 px-0">
                                <span><b>Category</b></span>
                            </div>
                            <div className="col-8 col-md-8 px-0">
                                <span>: {val.category}</span>
                            </div>
                        </div>
                        <div className="col-10 col-md-12 px-2 pt-2">
                            <input type="button" value="Edit Data" onClick={() => this.setState({selectedId : val.id})} className="btn btn-primary w-100 py-1 mb-2 rounded-0"/>
                            <input type="button" value="Delete Data" onClick={() => this.onDeleteClick(val.id)} className="btn btn-danger w-100 py-1 mb-2 rounded-0"/>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    onSubmitClick = () => {
        // 1. Ambil Semua Value dari Inputs
        // 2. Validasi Input Apakah Ada yang Kosong atau Tidak
        // 3. Validasi Nama Produk (Duplikat atau Tidak)
        // 4. Kirim ke API

        // Step 1.
        var product = this.refs.product.value
        var price = this.refs.price.value
        var stock = this.refs.stock.value
        var category = this.refs.category.value
        var image = this.refs.image.value

        // Step 2.
        if(product === ''){
            this.setState({warningProduct : 'Data must be filled!'})
        }else if(product !== ''){
            this.setState({warningProduct : ''})
        }
        
        if(price === ''){
            this.setState({warningPrice : 'Data must be filled!'})
        }else if(price !== ''){
            this.setState({warningPrice : ''})
        }
        
        if(stock === ''){
            this.setState({warningStock : 'Data must be filled!'})
        }else if(stock !== ''){
            this.setState({warningStock : ''})
        }
        
        if(category === ''){
            this.setState({warningCategory : 'Data must be filled!'})
        }else if(category !== ''){
            this.setState({warningCategory : ''})
        }
        
        if(image === ''){
            this.setState({warningUrl : 'Data must be filled!'})
        }else if(image !== ''){
            this.setState({warningUrl : ''})
        }

        if(product && price && stock && category && image){
            // Step 3.
            var checkValidation = this.state.data.some(products => products.product === product)
            if(checkValidation){
                this.setState({warningProduct : 'The Product Already Exist!'})
            }else{
                //Step 4.
                Axios.post(linkFakeAPI, {product, price, stock, category, image})
                .then((res) => {
                    console.log(res)
                    if(res.status === 201){
                        alert('Added Product Successfull!')
                        this.refs.product.value = ''
                        this.refs.price.value = ''
                        this.refs.stock.value = ''
                        this.refs.category.value = ''
                        this.refs.image.value = ''
                        this.setState({showForm : false})
                        this.setState({warning : ''})
                        this.onGetData()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    render(){
        if(this.state.data === null){
            return(
                <div className="py-5">
                    <div>
                        <center>
                            <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="Loading" />
                            <h3>Loading</h3>
                        </center>
                    </div>
                </div>
            )
        }
        return(
            <div className='container mt-3'>
                <div className="row justify-content-center justify-content-md-left">
                    <div className="col-10 col-md-12 pl-2 pl-md-2">
                        <input type="button" value="Add New Product" onClick={()=> this.setState({showForm : true})} className="btn btn-primary mb-2 rounded-0"/>
                    </div>
                </div>
            {
                this.state.showForm?
                <div className="row my-3 justify-content-center">
                    <div className="col-10 col-md-12 pl-2 pr-2">
                        <div className="card rounded-0">
                            <div className="card-body">
                                <h3>Add New Product</h3>
                                <input type="text" placeholder="Name of product" ref="product" className="form-control" />
                                <div className="warning">{this.state.warningProduct}</div>
                                <input type="text" placeholder="Price of product" ref="price" className="form-control mt-3" />
                                <div className="warning">{this.state.warningPrice}</div>
                                <input type="text" placeholder="Stock of product" ref="stock" className="form-control mt-3" />
                                <div className="warning">{this.state.warningStock}</div>
                                <select className="custom-select mt-3" ref="category" size="3">
                                    <option value="Football Boots">Football Boots</option>
                                    <option value="Futsal Boots">Futsal Boots</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="warning">{this.state.warningCategory}</div>
                                <input type="text" placeholder="(Url of product)" ref="image" className="form-control mt-3" />
                                <div className="warning mb-3">{this.state.warningUrl}</div>
                                <input type="button" value="Submit" className="btn btn-success mt-3" onClick={this.onSubmitClick} /> &nbsp;
                                <input type="button" value="Close" className="btn btn-danger mt-3" onClick={()=> this.setState({showForm : false})} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                false
            }
                <div className="row justify-content-center">
                    {
                        this.mapDataProducts()
                    }
                </div>
            </div>
        )
    }
}

export default ListProducts

