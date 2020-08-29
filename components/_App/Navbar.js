import { Menu } from "antd"
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
import { handleLogout } from "../../utils/auth"
import { useRouter } from "next/router"

function Navbar(props) {
  const router = useRouter()
  const { mode, user, isRootOrAdmin } = props

  return (
    <Menu
      className='menu main-menu'
      theme='dark'
      mode={mode}
      style={{ lineHeight: "64px" }}
      selectedKeys={router.pathname}
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

      {isRootOrAdmin && (
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

      <Menu.Item key='cart'>
        <Link href='/cart'>
          <div className={`items-${mode}`}>
            <ShoppingCartOutlined style={{ fontSize: "1.8em" }} />
            <span>My Cart</span>
          </div>
        </Link>
      </Menu.Item>

      {user && (
        <Menu.Item onClick={handleLogout} key='logout'>
          <div className={`items-${mode}`}>
            <LogoutOutlined style={{ fontSize: "1.8em" }} />
            <span>Logout</span>
          </div>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key='login'>
          <Link href='/login'>
            <div className={`items-${mode}`}>
              <LoginOutlined style={{ fontSize: "1.8em" }} />
              <span>Login</span>
            </div>
          </Link>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key='signup'>
          <Link href='/signup'>
            <div className={`items-${mode}`}>
              <UserAddOutlined style={{ fontSize: "1.8em" }} />
              <span>Sign Up</span>
            </div>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

export default Navbar
