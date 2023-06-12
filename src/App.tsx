import { useEffect, useRef, useState } from 'react'
import './App.scss'

import serviceAxios from "./utils/request"

function App() {
  const [input, setInput] = useState("")
  const [data, setData] = useState([])
  const [focus, setFocus] = useState(false)
  const [filterData, setFilterData] = useState([])
  const inputRef = useRef(null)

  const selectClick = (text: string) => {
    console.log(text);
    inputRef!.current!.value = text;
    setInput(text)
  }

  // 开启关闭sug
  const handleFocus = () => {
    setFocus(true)
    console.log(focus);
  }
  const handleUnFocus = (event: any) => {
    const tp = document.querySelector(".form");
    if (tp) {
      if (!tp.contains(event.target)) {
        console.log(event.target);
        console.log(tp);
        setFocus(false)
      }
    }
    console.log(focus);
  }

  // 监听
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  // 获取信息
  const getData = async () => {
    const jsonData = await import("../public/json/data.json")
    const arr = jsonData.default as []
    console.log(arr);
    setData(arr)
    setFilterData(arr)
    console.log(filterData);
  }

  // 过滤数据
  const filter = (keyWord: string) => {
    if (keyWord) {
      const newData = data.filter(item => {
        return item.text.match(keyWord)
      })
      console.log(newData);
      setFilterData(newData)
    } else {
      setFilterData(data)
    }
  }

  const handleDelete = () => {
    setFilterData([])
    setInput("")
    setFocus(false)
    inputRef!.current!.value = ""
  }

  // 初始化
  useEffect(() => {
    getData()
  }, [])

  // 监听刷新
  useEffect(() => {
    console.log(input);
    filter(input)
  }, [input])


  return (
    <div className='wrapper' onClick={e => handleUnFocus(e)}>
      <div className="form_wrapper">
        <div className="logo_wrapper">
          <img id='logo' src="https://img.sj33.cn/uploads/202009/7-20092H12GA16.jpg" alt="" />
        </div>
        <div className="form">
          <div className="form_input">
            <input id='input' type="text" ref={inputRef} onFocus={e => handleFocus()} onChange={e => handleChange(e)} />
            <div className='delete' onClick={e => handleDelete()}><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L40 40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M8 40L40 8" stroke="#999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
            <button className='bnt' >百度一下</button>
          </div>
          {
            focus ? <div className="bdsug" >
              {
                filterData.map((item) => {
                  return <span className='bdsug_item' key={item.id} onClick={e => selectClick(item.text)}>{item.text}</span>
                })
              }
            </div> : null
          }
        </div>
      </div>
    </div>
  )
}

export default App
