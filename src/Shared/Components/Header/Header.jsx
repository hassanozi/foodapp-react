
export default function Header({title,description,imgUrl}) {
  return (
    <header className='bg-success'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-8 text-white'>
            <div className='d-flex flex-column justify-content-center p-2'>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='h-100 text-end'>
              <img className='img-fluid w-50' src={imgUrl} />
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
