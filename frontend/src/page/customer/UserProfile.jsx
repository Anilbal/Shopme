import React, { useEffect, useState } from "react";
import { getSingleUser, isAuthenticated } from "../../api/userApi";
import { getUserOrder } from "../../api/orderApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";


const UserProfile = () => {

  // USER ORDERS 
  let { user } = isAuthenticated();
  let [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    getUserOrder(user._id)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          setMyOrder(data);
        }
      })
      .catch((error) => console.log(error));
  }, [user._id])

  // USER DETAILS
  const [getData,setGetData]=useState({})
  const {id}=useParams()
  useEffect(()=>{
    getSingleUser(id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setGetData(data)
      }
    })
    .catch(error=>console.log(error))
  },[id])
  console.log(user)
  return (
    <>
    <ToastContainer position="top-right"/>
      <div className="user-main">
        <div className="user-carousel">
          <h2>Profile</h2>
          <Link to={'/'} style={{textDecoration:"none"}}>
          <button>
            <BiSolidLogInCircle />
            Go home
          </button>
          </Link>
        </div>
        <div className="user-infoDiv">
          <div className="userProfile-div">
            <div className="userName">
              <p>{user.username}</p>
            </div>
            <hr />
            <div className="user-dataDiv">
              <div className="sub-userData">
                <p>User Id :</p>
                <input type="text" name="id" value={getData._id} />
              </div>
              <div className="sub-userData">
                <p>Username :</p>
                <input type="text" name="username" value={getData.username} />
              </div>
              <div className="sub-userData">
                <p>Email :</p>
                <input type="text" name="email" value={getData.email}/>
              </div>
            </div>
          </div>
          <div className="order-profileDiv">
            <h2 className="allOrders">
              ALL Orders
            </h2>
            <table >
                <thead>
                    <tr>
                        <td>Order Id</td>
                        <td colSpan={2}>Title</td>
                        <td colSpan={2}>Quantity</td>
                        <td>Amount</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {myOrder.length > 0 &&
                    myOrder.map((order) => {
                            return <>
                            <tr key={order._id} style={{border:"1px solid gray"}} className="tr-body">
                                <td>{order._id}</td>
                                {order.orderItems.map((item) => {
                                    return <td className="table-flex">
                                     {item.product.title}
                                      </td>
                                })}
                                {order.orderItems.map((item,i) => {
                                    return  <td className="quantity-flex" key={i}>
                                      {item.quantity}
                                      </td>
                                })}
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td><Link className="user-link">
                                    <button className="user-detailsBtn">
                                        <GrFormView />View
                                    </button>
                                    </Link>
                                </td> 
                            </tr>
                            </>
                    })
                }
                
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

