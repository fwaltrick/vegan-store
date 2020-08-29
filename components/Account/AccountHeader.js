import { Divider, Avatar, Tag } from "antd"
import { formatDate } from "../../utils/formatDate"

function AccountHeader({ role, email, name, createdAt }) {
  // function to get name initials for Avatar
  const initials = (n) => {
    return n.split(" ").reduce((acc, word, i, array) => {
      if (i === 0 || i == array.length - 1) {
        acc += word[0]
      }
      return acc
    }, "")
  }

  // formatting date (createdAt)
  // const joined = createdAt.slice(0, 10).split("-").reverse().join(".")

  return (
    <>
      <Tag color='#330066'>{role}</Tag>
      <div className='account-user'>
        <Avatar
          style={{ backgroundColor: "#01b1bc", verticalAlign: "middle" }}
          size={70}
        >
          {" "}
          {initials(name)}
        </Avatar>
        <h3 style={{ fontWeight: "bold" }}>{name}</h3>
        <p style={{ marginBottom: "0" }}>{email}</p>
        <p style={{ marginTop: "0", fontSize: "0.7rem" }}>
          Joined in {formatDate(createdAt)}
        </p>
        <Divider
          className='divider'
          style={{
            background: "#fff",
          }}
        />
      </div>
    </>
  )
}

export default AccountHeader
