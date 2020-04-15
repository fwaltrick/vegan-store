import { Button, Modal } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import Vegan from "../../public/vegan.svg"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import { useRouter } from "next/router"

function DeleteProduct({ _id }) {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }
    await axios.delete(url, payload)
    router.push("/")
  }

  return (
    <>
      <Button
        type='danger'
        onClick={() => setVisible(true)}
        style={{ fontSize: "0.9rem" }}
      >
        <DeleteOutlined /> Delete Item
      </Button>
      <Modal
        centered
        visible={visible}
        title='Delete item?'
        onCancel={() => setVisible(false)}
        footer={[
          <Button key='back' danger onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key='ok' type='danger' onClick={handleDelete}>
            <DeleteOutlined />
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  )
}

export default DeleteProduct
