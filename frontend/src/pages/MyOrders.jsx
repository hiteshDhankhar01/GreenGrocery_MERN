import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../context/Authcontext';
import ReviewForm from './ReviewForm';
import { BASE_URL } from '../config';

const MyOrders = () => {
    const { user, token } = useContext(authContext);
    const [items, setItems] = useState([]);
    const [reviewPage, setReviewPage] = useState(false);
    const [itemId, setItemId] = useState("");

    const reviewForm = (product) => {
        setItemId(product);
    setReviewPage(!reviewPage);
};


const fetchOrderItems = async () => {
    try {
      const result = await fetch(`${BASE_URL}/user/get-order-item/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { orderData } = await result.json();
      setItems(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  return (
    <div className='h-[100%] w-[80%] mx-auto min-h-screen py-4'>
  <div>
    <div className='h-[100%] w-[80%] mx-auto'>
      <div className='flex flex-col pt-[2rem] mb-[1.5rem] w-[90%]'>
        <h2 className='text-[2rem]'>
          <span className='capitalize'>My Order</span>
        </h2>
        <nav className='flex text-[1.2rem] gap-2'>
          <li className='list-none hover:text-[#329967]'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <div className='mx-1'>/</div>
          <li className='list-none'>
            <span className='capitalize'>My Order</span>
          </li>
        </nav>
      </div>

      {items && items.length !== null && items.length !== 0 ? (
        <div>
          {Array.isArray(items) &&
            items.map((item) => (
              <div key={item._id} className='flex text-center px-auto mb-4'>
                <div className='image f-1/2 mr-[2rem] flex items-center justify-center'>
                  <div className='h-[5rem] w-[5rem] '>
                    <img src={item.itemImage} alt='' className='w-full h-full object-cover rounded-[1rem]' />
                  </div>
                </div>
                <div className='flex-1 f-1/2 text-start pl-[2rem] border-l-2 w-[30rem]'>
                  <div className='bg-white flex-col text-start gap-2 '>
                    <div className='font-bold text-xl mb-2 capitalize'>{item.itemName}</div>
                    <p className='text-gray-700 text-base text-[1rem]'>
                      {`Price: ₹${item.itemPrice}`}
                      <span className='text-[grey]'>{item.quantity > 1 && ` X ${item.quantity} = ₹${item.itemPrice * item.quantity}`}</span>
                    </p>
                    <p className='text-gray-700 text-base'>
                      {item.itemQuantity}
                      <span className='text-[grey]'>
                        <span className='text-[grey]'>
                          {item.quantity > 1 && ` X ${item.quantity} = `}
                          {item.quantity > 1
                            ? parseFloat(item.itemQuantity) * item.quantity >= 1000
                              ? `${((parseFloat(item.itemQuantity) * item.quantity) / 1000).toFixed(2)} kg`
                              : `${(parseFloat(item.itemQuantity) * item.quantity).toFixed(2)} g`
                              : ''}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className='flex flex-col mx-auto text-start pl-[2rem] border-l-2 py-auto'>
                  <div>You buy this item on {new Date(item.createdAt).toLocaleString()}</div>
                <div>
                    <button
                      className='border-[1px] text-[1rem] border-[#6b7280] rounded-[4px] px-2 my-2 bg-white shadow-none hover:bg-gray-100'
                      style={{ boxShadow: 'none', transform: 'scale(1)' }}
                      onClick={() => reviewForm(item.itemId)}>
                      Write a product review
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>No items</div>
      )}
      <div>{reviewPage ? <ReviewForm itemId={itemId} toggle={() => setReviewPage(!reviewPage)} /> : null}</div>
    </div>
    </div>
</div>

);
};

export default MyOrders;

