import React from 'react'
import Badge from '../../../components/Badge'
import { Link } from 'next/link'

const Classes = () => {
  return (
    <div>
      <h1 className='class-page-subheading'>Classes</h1>
      <p className='class-paragraph'>
        Here are the list of current classes you are offering to your students
        this session.
      </p>
      <section className='flex flex-col md:flex-row md:justify-between md:items-center mt-5'>
        <h3 className='class-page-subheading text-base'>All Classes </h3>
        <input
          type='text'
          placeholder='search for class'
          className='reg-form-input h-10 xs:w-full md:w-[23.5rem] px-2'
        />
      </section>

      <div className='overflow-auto mt-5'>
        <table className='w-full text-[#1F2937] tracking-[-0.02rem]'>
          <thead className='bg-[#F3F4F6] font-semibold'>
            <tr className='text-center'>
              <th>
                <input type='checkbox' />
              </th>
              <th className='whitespace-nowrap p-3 text-left'>Class Name</th>
              <th className='whitespace-nowrap p-3 text-left'>Class Type</th>
              <th className='whitespace-nowrap p-3 text-left'>Starting Date</th>
              <th className='whitespace-nowrap p-3 text-left'>Time</th>
              <th className='whitespace-nowrap p-3 text-left'>Students</th>
              <th className='whitespace-nowrap p-3 text-left'>Ending Date</th>
              <th className='whitespace-nowrap p-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody className='whitespace-nowrap text-sm divide-y divide-gray-300'>
            <tr>
              <td className='p-3'>
                <input type='checkbox' />
              </td>

              {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
              {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
              <td className='p-3'>
                <Link to='/master-admin/class'>Chemistry classs</Link>
              </td>
              <td className='p-3'>Group and Private</td>
              <td className='p-3'>02/07/2022</td>
              <td className='p-3'>02:00 pm - 03:15 pm</td>
              <td className='p-3'>20</td>
              <td className='p-3'>02/07/2022</td>
              <td className='p-3'>
                <Badge status='yet to start' />
              </td>
            </tr>
            <tr>
              <td className='p-3'>
                <input type='checkbox' />
              </td>

              {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
              {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
              <td className='p-3'>Chemistry classs</td>
              <td className='p-3'>Group and Private</td>
              <td className='p-3'>02/07/2022</td>
              <td className='p-3'>02:00 pm - 03:15 pm</td>
              <td className='p-3'>20</td>
              <td className='p-3'>02/07/2022</td>
              <td className='p-3'>
                <Badge status='ongoing' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className='flex flex-col md:flex-row gap-3'>
        <select className='border rounded-md text-sm h-[38px]'>
          <option>View class</option>
          <option>Edit class</option>
          <option>Delete class</option>
          <option>Deactivate class</option>
        </select>
        <button className='button h-[38px] text-center py-[5px] px-[62px]'>
          Apply
        </button>
      </section>
    </div>
  )
}

export default Classes
