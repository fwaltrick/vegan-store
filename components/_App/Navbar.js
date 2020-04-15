import { Menu, Icon } from "antd"
import Link from "next/link"
import {
  GiftOutlined,
  PlusCircleOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons"

function Navbar(props) {
  const { mode } = props
  const user = true

  return (
    <Menu
      className='menu main-menu'
      theme='dark'
      mode={mode}
      style={{ lineHeight: "64px" }}
    >
      {/* <Menu.Item key='home'>
          <Link href='/'>
            <div className='logo'>
              <LotusBlue />
            </div>
          </Link>
        </Menu.Item> */}

      <Menu.Item key='products'>
        <Link href='/products'>
          <div className={`items-${mode}`}>
            <GiftOutlined style={{ fontSize: "1.8em" }} />
            <span>Products</span>
          </div>
        </Link>
      </Menu.Item>

      {user && (
        <Menu.Item key='add'>
          <Link href='/add'>
            <div className={`items-${mode}`}>
              <PlusCircleOutlined style={{ fontSize: "1.8em" }} />
              <span>Add Item</span>
            </div>
          </Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.Item key='account'>
          <Link href='/account'>
            <div className={`items-${mode}`}>
              <UserOutlined style={{ fontSize: "1.8em" }} />
              <span>My Account</span>
            </div>
          </Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.Item key='cart'>
          <Link href='/cart'>
            <div className={`items-${mode}`}>
              <ShoppingCartOutlined style={{ fontSize: "1.8em" }} />
              <span>My Cart</span>
            </div>
          </Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.Item key='logout'>
          <div className={`sign-items-${mode}`}>
            <LogoutOutlined style={{ fontSize: "1.3em" }} />
            <span>Logout</span>
          </div>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key='login'>
          <div className={`sign-items-${mode}`}>
            <LoginOutlined style={{ fontSize: "1.3em" }} />
            <span>Login</span>
          </div>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key='signup'>
          <div className={`sign-items-${mode}`}>
            <UserAddOutlined style={{ fontSize: "1.3em" }} />
            <span>Sign Up</span>
          </div>
        </Menu.Item>
      )}
    </Menu>
  )
}

export default Navbar
