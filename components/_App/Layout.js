import Head from "next/head"
import Header from "./Header"
import { Layout, Menu } from "antd"
import {
  LinkedinOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons"
import HeadContent from "./HeadContent"

function MyLayout({ children }) {
  const { Content, Footer } = Layout

  return (
    <>
      <Head>
        <title>The Vegan Beauty Shop • vegan skincare</title>
        <HeadContent />

        {/* <link
          href='https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,900&display=swap'
          rel='stylesheet'
        /> */}

        {/* <HeadContent /> */}
        {/* Stylesheets */}
      </Head>
      <Layout>
        <Header />
        <Content className='content'>{children}</Content>
        <Footer className='footer' style={{ textAlign: "center" }}>
          <div>
            The Vegan Beauty Shop ©2020 Created by Fabricio Waltrick for
            portfolio purposes only{" "}
          </div>
          <GithubOutlined
            style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
          />
          <LinkedinOutlined
            style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
          />
          <MailOutlined style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }} />
        </Footer>{" "}
      </Layout>
    </>
  )
}

export default MyLayout
