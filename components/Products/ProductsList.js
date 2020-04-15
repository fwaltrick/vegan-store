import { Card, List } from "antd"
import Link from "next/link"

function ProductsList({ products }) {
  return (
    <List
      style={{
        maxWidth: "1600px",
        padding: "15px",
        background: "#ebeae4",
      }}
      grid={{
        gutter: 15,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={products}
      renderItem={item => (
        <List.Item
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href={`/product?_id=${item._id}`}>
            <Card
              hoverable
              className='product-card'
              style={{ width: 300 }}
              key={item._id}
              cover={<img alt={item.name} src={item.mediaUrl} />}
            >
              <div>
                <div className='card-meta-top'>
                  <div className='card-brand'>{item.brand}</div>
                  <div className='card-more'>
                    <a href='#'>More</a>
                  </div>
                </div>
                <div className='card-description'>
                  <span>{item.name}</span>
                </div>
                <div className='card-price'>
                  <span>€ {item.price}</span>
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  )
}

export default ProductsList
