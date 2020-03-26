import axios from 'axios'
import {ADD_ITEM,EDIT_ITEM,DELETE_ITEM,SEARCH_ITEM,FETCH_ITEM} from "./types"

const baseurl = "https://us-central1-stock-inventory-f75b5.cloudfunctions.net/api/"

var nextid = 0

export const fetchDataSuccess = (products)=>{
    return{
        type : FETCH_ITEM,
        products
    }
}  

export const fetchData = ()=>{
      return(dispatch)=>{
          return axios.get(baseurl+"getStocks").then(response=>{
            nextid = response.data.length
            dispatch(fetchDataSuccess(response.data))
          }).catch(e=>{
              throw(e)
          })
      }
  }

  export const fetchDataByNameSuccess = (products)=>{
    return{
        type : SEARCH_ITEM,
        products
    }
}  

export const fetchDataByName = (data)=>{
      return(dispatch)=>{
          return axios.get(baseurl+"getStocks/"+data).then(response=>{
              dispatch(fetchDataByNameSuccess(response.data))
          }).catch(e=>{
              throw(e)
          })
      }
  }

  export const addDataSuccess = (data)=>{
      return{
        type:ADD_ITEM,
        payload : {
        "id":data.id,
        "deleteStatus" : data.deleteStatus,
        "image": data.image,
        "product_Name": data.product_Name,
        "quantity": data.quantity,
        "price": data.price
  }
        }
    }

  export const addData = (data)=>{
      return(dispatch)=>{
          let formData = {...data,id:nextid,deleteStatus: false, image: "https://avatars.mds.yandex.net/get-mpic/1884605/img_id7274359217689285482.jpeg/9"}
        return axios.put(baseurl+"addStock/"+nextid,formData).then(response=>{
            dispatch(addDataSuccess(JSON.parse(response.config.data)))
        }).catch(e=>{
            throw(e)
        })
      }
  }

export const editDataSuccess = (data)=>{
    return{
        type:EDIT_ITEM,
        payload : {
            "id":data.id,
            "deleteStatus" : data.deleteStatus,
            "image": data.image,
            "product_Name": data.product_Name,
            "quantity": data.quantity,
            "price": data.price
      }
    }
}

export const editData = (data)=>{
    return(dispatch)=>{
        let id = data.id
      return axios.put(baseurl+"addStock/"+id,data).then(response=>{
          dispatch(editDataSuccess(JSON.parse(response.config.data)))
      }).catch(e=>{
          throw(e)
      })
    }
}

  export const deleteDataSuccess = (id)=>{
    return{
        type : DELETE_ITEM,
        payload: {
            id
          }
    }
  }

  export const deleteData = (id)=>{
    
      return (dispatch)=>{
        let data = { deleteStatus: true };
        return axios.put(baseurl+"deleteStocks/" +
               id,data).then(response=>{
                   dispatch(deleteDataSuccess(id))
               })
      }
  }