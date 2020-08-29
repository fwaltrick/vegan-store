import { Result, Button, List, Avatar, Tooltip, message } from "antd"
import { ShoppingOutlined, CloseOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"

function CartItemList({ products, user, handleRemoveFromCart, success }) {
  const router = useRouter()

  if (success) {
    return (
      <Result
        status='success'
        title='Thank you!'
        subTitle='Your order has been placed.'
      />
    )
  }

  if (products.length === 0) {
    return (
      <>
        {user ? (
          <Result
            icon={<ShoppingOutlined style={{ color: "#3dbd7d" }} />}
            title='There are no products in your cart yet'
            extra={
              <Button type='primary' onClick={() => router.push("/products")}>
                View Our Products
              </Button>
            }
          />
        ) : (
          <Result
            icon={<ShoppingOutlined style={{ color: "#3dbd7d" }} />}
            title='You are not logged in'
            extra={
              <Button type='primary' onClick={() => router.push("/login")}>
                Login to Add Products
              </Button>
            }
          />
        )}
      </>
    )
  }
  return (
    <>
      <List
        itemLayout='horizontal'
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={90} src={item.product.mediaUrl} />}
              title={
                <a href={`/product?_id=${item.product._id}`}>
                  {item.product.name}
                </a>
              }
              description={`${item.quantity} x €${item.product.price}`}
            />
            <Tooltip title='Remove Item'>
              <Button
                type='link'
                size='small'
                shape='circle'
                icon={<CloseOutlined style={{ color: "#330066" }} />}
                onClick={() => handleRemoveFromCart(item.product._id)}
              ></Button>
            </Tooltip>
          </List.Item>
        )}
      />
    </>
  )
}

export default CartItemList
