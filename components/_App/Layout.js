import Head from "next/head"
import Header from "./Header"
import { Layout } from "antd"

import {
  LinkedinOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons"
import HeadContent from "./HeadContent"

function MyLayout({ children, user }) {
  const { Content, Footer } = Layout

  return (
    <>
      <Head>
        <title>The Vegan Beauty Shop • vegan skincare</title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon-32x32.png'
        />

        <HeadContent />

        {/* <link rel='stylesheet' href='https://use.typekit.net/eaw8gkg.css' /> */}

        {/* <link
          href='https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,900&display=swap'
          rel='stylesheet'
        /> */}

        {/* <HeadContent /> */}
        {/* Stylesheets */}
      </Head>
      <Layout>
        <Header user={user} />
        <Content className='content'>{children}</Content>
        <Footer className='footer' style={{ textAlign: "center" }}>
          <div>
            The Vegan Beauty Shop ©2020 Created by Fabricio Waltrick for
            portfolio purposes only{" "}
          </div>
          <a target='_blank' href='https://github.com/fwaltrick'>
            <GithubOutlined
              style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
            />
          </a>
          <a
            target='_blank'
            href='https://www.linkedin.com/in/fabricio-waltrick-988352164/'
          >
            <LinkedinOutlined
              style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
            />
          </a>
          <a href='mailto:fabricio.waltrick@gmail.com'>
            <MailOutlined
              style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}
            />
          </a>
        </Footer>{" "}
      </Layout>
    </>
  )
}

export default MyLayout
