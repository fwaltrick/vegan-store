import { InputNumber, Input, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"

function AddProductToCart() {
  return (
    <div className='product-cart'>
      <Input.Group compact>
        <InputNumber
          min={1}
          placeholder='Quantity'
          style={{ width: "90px", fontSize: "0.8rem" }}
        />
        <Button className='button-cart'>
          <ShoppingCartOutlined style={{ alignSelf: "center" }} />
          Add to Cart
        </Button>
      </Input.Group>
    </div>
  )
}

export default AddProductToCart
