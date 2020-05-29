import { Collapse, Avatar, List, Tag } from "antd"
import { CalendarOutlined, ShoppingOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import { formatDate } from "../../utils/formatDate"

function AccountOrders({ orders }) {
  const { Panel } = Collapse
  const router = useRouter()

  // mapping all orders from one client
  const mapOrders = orders.map((order) => {
    return (
      <Panel
        style={{ background: "#ebeae4" }}
        header={
          <Tag color='#1d7258'>
            <ShoppingOutlined /> &nbsp;
            {formatDate(order.createdAt)}
          </Tag>
        }
        key={order._id}
      >
        <List
          itemLayout='horizontal'
          header={`Total: €${order.total.toFixed(2)}`}
          style={{ fontWeight: "bold" }}
          dataSource={order.products}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape='square'
                    size={60}
                    src={item.product.mediaUrl}
                  />
                }
                title={
                  <a href={`/product?_id=${item.product._id}`}>
                    {item.product.name}
                  </a>
                }
                description={`${item.quantity} x €${item.product.price}`}
              />
            </List.Item>
          )}
        />
      </Panel>
    )
  })

  return (
    <>
      <h4 style={{ fontWeight: "bold" }}>
        <CalendarOutlined />
        &nbsp; Order History
      </h4>
      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        <Collapse>{mapOrders}</Collapse>
      )}

      {/* <Button type='primary' onClick={() => router.push("/products")}>
        View Our Products
      </Button> */}
    </>
  )
}

export default AccountOrders
