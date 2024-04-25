'use client'
import { useContext } from 'react';

import { BiTimer } from 'react-icons/bi';


type TimeCategoryProps = {
  time: number;
  setTime: (value: number) => void;
  setLocalStorage: (key: string, value: number) => void;
  restart: () => void;
};

const TimeCategory = ({
  time,
  setTime,
  restart,
  setLocalStorage,
}: TimeCategoryProps) => {

  return (
    <div className='flex items-center justify-center gap-3'>
      <BiTimer className='text-3xl' />
      <div
        className='flex gap-4 rounded-lg'
      >
        <span
          className={`category ${
            time === 15000 ? 'font-bold underline' : ''
          } hover:underline`}
          onClick={() => {
            setTime(15000);
            setLocalStorage('time', 15000);
            restart();
          }}
          style={{
            color: time === 15000 ? 'text-decoration: underline' : '',
          }}
        >
          15s
        </span>
        <span
          className={`category ${
            time === 30000 ? 'font-bold underline' : ''
          } hover:underline`}
          onClick={() => {
            setTime(30000);
            setLocalStorage('time', 30000);
            restart();
          }}
          style={{
            color: time === 30000 ? 'text-decoration: underline' : '',
          }}
        >
          30s
        </span>
        <span
          className={`category ${
            time === 60000 ? 'font-bold underline' : ''
          } hover:underline`}
          onClick={() => {
            setTime(60000);
            setLocalStorage('time', 60000);
            restart();
          }}
          style={{
            color: time === 60000 ? 'text-decoration: underline' : '',
          }}
        >
          60s
        </span>
      </div>
    </div>
  );
};

export default TimeCategory;
