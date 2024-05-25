'use client'
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import { FormEvent } from 'react'


const Modals = () => {

  let [isOpen, setIsOpen] = useState(true)
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [email , setEmail] = useState('');
  
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () =>  {
    setIsOpen(false);
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting (true);

    // await ( adduserEmailToProduct , email) ;
    setIsSubmitting (false)
    setEmail('');
    closeModal();


  }

  return (
    <>
    <div className=" btn  flex justify-center text-center">
      <button
      type='button'
      className=' '

      onClick={openModal}
      >
        Track
      </button>

     <Transition appear show={isOpen} as={Fragment}>
     <Dialog as='div'  onClose={closeModal} className="dialog-container">
        <div className="min-h-screen px-4 text-center">

          <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0'/>

          </Transition.Child>


        <span className=' inline-block h-screen align-middle ' area-hidden='true'/>
          <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
          >
              <div className="dialog-content">
                <div className="">
                  <div className="flex justify-between">
                  <div className="border-2 border-slate-100 rounded-lg w-12 h-12 flex justify-center">
                    <Image
                    src='/assets/icons/logo.svg'
                    alt='logo-modal'
                    height={28}
                    width={28}
                    />

                    
                  </div>

                  <button 
                  onClick={closeModal}
                  className="border-2 border-slate-100 rounded-lg w-12 h-12 flex justify-center">
                    <Image
                    src='/assets/icons/x-close.svg'
                    alt='close'
                    height={28}
                    width={28}
                    />
                  </button>
                  </div>

                  <div className=" mt-3">
                    <h3 className='text-secondary text-lg  font-semibold  '>
                      Stay updated with product pricing alerts right in your inbox!
                    </h3>

                    <p className='text-md text-slate-700 '>
                      Never miss a bargin again with our timly alerts!
                    </p>
                  </div>

                  <form 
                  className="flex flex-col gap-3 "
                  onSubmit={handleSubmit}
                  >
                    <h4 className='mt-3 text-slate-900 font-semibold '>Email address</h4>
                     
                     <div className="flex gap-3 border-2 border-slate-100 rounded-full p-3">
                      <Image
                      src='/assets/icons/mail.svg'
                      alt='mail'
                      height={18}
                      width={18}
                      />

                      <input 
                      type="email"
                      placeholder='Enter your email address '
                      className='border-2 border-slate-50 rounded-full'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                     </div>
                    
                     <div className="w-full bg-secondary text-white font-semibold flex justify-center text-center rounded-lg p-3 mt-6">
                    <button 
                    type='submit'
                    >
                     {isSubmitting ? 'Submitting...' :  'Track'}
                    </button>
                  </div>
                    
                  </form>

                  
                </div>
              </div>


          </Transition.Child>
        </div>
    </Dialog>
     </Transition>


    </div>
    </>
  )
}

export default Modals