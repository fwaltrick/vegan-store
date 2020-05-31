import React, { useState, useEffect } from "react"
import { Button, Divider, Form, Input, Alert, Spin, message } from "antd"
import Link from "next/link"
import { SmileOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import Icon from "@ant-design/icons"
import UserSvg from "../public/images/userSvg"
import catchErrors from "../utils/catchErrors"
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"

const INITIAL_USER = {
  email: "",
  password: "",
}

function Login() {
  const [form] = Form.useForm()
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Invalid email",
    },
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const tailLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 18, offset: 6 },
    },
  }

  const fail = (error) => {
    message.config({
      top: 65,
      duration: 4,
    })
    message.error(`Ooops! ${error}`)
  }

  function handleChange(e) {
    const { id, value } = e.target
    setUser((prevState) => ({ ...prevState, [id]: value }))
  }

  async function onFinish(values) {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (err) {
      catchErrors(err, fail)
    } finally {
      setLoading(false)
    }
  }

  function onFinishFailed(errorInfo) {
    console.error("Failed:", errorInfo)
  }

  const UserIcon = (props) => <Icon component={UserSvg} {...props} />

  return (
    <div className='background-shape background-shape--yellow'>
      <div className='container'>
        <Alert
          icon={<SmileOutlined />}
          type='info'
          showIcon
          message='Welcome back!'
          description='Please enter your email and password'
        />

        <Divider
          className='divider'
          style={{
            background: "#fff",
          }}
        />

        <div className='form'>
          <Form
            {...layout}
            form={form}
            layout='horizontal'
            validateMessages={validateMessages}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Spin spinning={loading} tip='Loading...'>
              <Form.Item
                name='email'
                label='Email'
                className='form-item'
                value={user.email}
                rules={[{ required: true, type: "email" }]}
                onChange={handleChange}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                value={user.password}
                className='form-item'
                rules={[{ required: true }]}
                onChange={handleChange}
              >
                <Input prefix={<LockOutlined />} type='password' />
              </Form.Item>
            </Spin>

            <Form.Item {...tailLayout}>
              <Button
                htmlType='submit'
                disabled={disabled || loading}
                type='primary'
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Divider
            className='divider'
            style={{
              background: "#fff",
            }}
          />
          <Alert
            style={{ width: "100%" }}
            type='error'
            icon={<UserIcon style={{ marginLeft: "-10px" }} />}
            showIcon
            message='No account yet?'
            description={
              <Link href='/signup'>
                <a style={{ color: "#3dbd7d" }}>Sign up here.</a>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Login
