import React, { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const Board = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [inputData, setInputData] = useState("");
  const [getData, setGetData] = useState([]);
  const [copyTask, setCopyTask] = useState([]);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleInputData = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    const obj = {
      taskName: inputData,
      isDone: false,
    };

    setInputData("")
    setOpenMenu(false)

    try {
      const res = await fetch("http://localhost:5000/kanban", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
      await res.json()
      fetchData()
    } catch (error) {
      throw new Error(error.message)
    }

  }

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/kanban', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      console.log(data.data)
      setGetData(data.data)

    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/kanban/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      fetchData()
      return data
    } catch (error) {
      return error
    }
  }

  // const handleUpdate = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/kanban/${id}`, {
  //       method: 'PUT',
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     const data = await res.json()
  //     setGetData(data)
  //     console.log(getData)
  //   } catch (error) {
  //     return error
  //   }
  // }

  return (
    <>
      <div className="px-1">
        <h1 className="text-2xl font-bold text-center pt-5">Kanban Board</h1>

        <div className="flex justify-around mt-10">
          <section className="w-[32vw] md:w-[15rem]">
            <h1 className="text-sm font-bold bg-red-100 text-center p-1 md:text-xl">
              ToDo
            </h1>

            <div className="">
              {getData.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-around border border-gray-300 rounded-md p-3 mt-2 cursor-grab"
                  >
                    <h1 className={items.isDone ? "line-through" : ""}>{items.taskName}</h1>

                    <div className="flex gap-7">
                      <button>
                        <CiEdit className="text-xl text-black font-bold hover:cursor-pointer" />
                      </button>

                      <button>
                        <RiDeleteBin6Line className="text-lg text-red-500 hover:cursor-pointer" onClick={() => handleDelete(items._id)} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="w-[32vw] md:w-[15rem] border-t border-gray-300 bg-red-100">
                <div>
                  {openMenu && (
                    <div className="flex flex-col items-center py-[0.300rem]">
                      <div className="flex flex-col bg-white items-center justify-center shadow-2xl w-[29vw] rounded-md py-[0.200rem] border border-gray-300 md:w-[13rem]">
                        <input
                          type="text"
                          placeholder="🛠️Build a task"
                          value={inputData}
                          onChange={handleInputData}
                          className="border w-[27vw] px-1 text-[0.600rem] border-gray-300 md:w-[11rem] md:h-9 md:rounded md:text-[0.700rem]"
                        />

                        <button
                          className="bg-blue-600 text-white mt-1 rounded px-2 py-[0.100rem] text-[0.600rem] md:px-4 md:text-[0.800rem] md:py-"
                          onClick={handleSubmit}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-[32vw] flex justify-center relative md:w-[15rem]">
                <button
                  className="text-sm border rounded-full bg-white p-[0.200rem] mt-[0.200rem] md:text-[1.3rem] md:p-1"
                  onClick={handleMenu}
                >
                  {!openMenu ? <BiTask /> : <IoCloseOutline />}
                </button>
              </div>
            </div>
          </section>

          <section className="w-[32vw] md:w-[15rem]">
            <h1 className="text-sm font-bold bg-red-100 text-center p-1 md:text-xl">
              Doing
            </h1>
          </section>

          <section className="w-[32vw] md:w-[15rem]">
            <h1 className="text-sm font-bold bg-red-100 text-center p-1 md:text-xl">
              Done
            </h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default Board;
