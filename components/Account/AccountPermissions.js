import React, { useState, useEffect, useRef } from "react"
import { Table, Switch } from "antd"
import { ControlOutlined } from "@ant-design/icons"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import cookie from "js-cookie"
import { formatDate } from "../../utils/formatDate"

function AccountPermissions() {
  const [users, setUsers] = useState([])
  const [updateRole, setUpdateRole] = useState(false)

  useEffect(() => {
    getUsers()
    setUpdateRole(false)
  }, [updateRole])

  async function getUsers() {
    const url = `${baseUrl}/api/users`
    const token = cookie.get("token")
    const payload = { headers: { Authorization: token } }
    const response = await axios.get(url, payload)
    setUsers(response.data)
  }

  async function updatePermission(user) {
    const url = `${baseUrl}/api/account`
    const payload = {
      _id: user._id,
      role: user.role === "admin" ? "user" : "admin",
    }
    await axios.put(url, payload)
    setUpdateRole(true)
  }

  const columns = [
    {
      title: "",
      dataIndex: "switch",
      key: "switch",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ]

  const mapUsers = users.map((user) => ({
    key: user._id,
    switch: (
      <Switch
        defaultChecked={user.role === "admin"}
        onChange={() => updatePermission(user)}
      ></Switch>
    ),
    name: user.name,
    email: user.email,
    joined: formatDate(user.createdAt),
    updated: formatDate(user.updatedAt),
    role: user.role,
  }))

  return (
    <>
      <h4 style={{ fontWeight: "bold", marginTop: "1.5em" }}>
        <ControlOutlined />
        &nbsp; Users Permissions
      </h4>

      <Table
        size='small'
        columns={columns}
        style={{ background: "#ebeae4" }}
        dataSource={mapUsers}
      ></Table>
    </>
  )
}

export default AccountPermissions
