import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { AddTask } from '../src/components/AddTask'
import { Task } from '../src/components/Task'


export type task = {
  id: number,
  task: string,
  complete: boolean
}

export type showAdd = {
  active: boolean;
  id: number;
}


const Home: NextPage = () => {

  const [showAdd, setShowAdd] = useState<showAdd>({
    active: false,
    id: 0
  })
  const [tasks, setTasks] = useState<task[]>([])

  // Set props to pass to the add Component 
  const props = {showAdd, setShowAdd, tasks, setTasks}
  
  // Handle the showAdd State to in value true shows the component add Task
  const handleAdd = () => {
    setShowAdd({id:0, active: true})
  }
  
  const handleDelete = (id:number) => {
    const newList = tasks.filter(task => task.id !== id)
    setTasks(newList)
  }
  

  //Props for task card
  const taskProps = {handleDelete, setShowAdd, showAdd}

  useEffect(() => {

    const getTask = localStorage.getItem('tasks')
    if(!!getTask) {
     setTasks(JSON.parse(getTask))
    }
  },[])
 
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks)  )
    },500) 
  },[tasks])

  


  return (
    <div className='bg-gray-100 w-full h-screen flex justify-center flex-col items-center'>
      <Head>
        <title>Tradehelm - Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        showAdd.active ? <AddTask showAdd={showAdd} tasks={tasks} setShowAdd={setShowAdd} setTasks={setTasks} /> : ""
      }

    <div className='flex justify-center flex-col items-center  w-1/2 '>
      <div className='text-center mb-10'>
        <h1 className='text-6xl font-bold mb-4'>Supermarket list</h1>
        <p className='font-medium text-2xl '>{tasks?.length} item(s)</p>
      </div>

      <button onClick={handleAdd} className='bg-blue-400 text-white py-3 text-xl w-full'>Add item</button>
    </div>

    <div className='w-1/2 mt-10 flex flex-col justify-center items-center gap-2'>
      {
        tasks?.map(item => <Task key={ Math.random() } item={item} setShowAdd={setShowAdd} handleDelete={handleDelete} showAdd={showAdd}  setTasks={setTasks} tasks={tasks}/>)
      }

    </div>
    </div>
  )
}

export default Home
