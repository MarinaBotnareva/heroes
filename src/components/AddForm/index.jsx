import React, {useState} from "react" 

function AddForm (props) {

  const [formData, setForm] = useState({
    nickname: '',
    realName: '',
    origin: '',
    description: '',
    image: ''
  });  

  function handleChange ({ target: { name, value } }) {
    setForm(s => ({ ...s, [name]: value }))
  }

  function onSubmit (e) {
    e.preventDefault();
    
    props.actions.createHeroRequest(formData)

    setForm(s => ({ ...s, 
      nickname: '',
      realName: '',
      origin: '',
      description: '',
      image: '' }))
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='nickname'
        placeholder='nickname'
        value={formData.nickname}
        onChange={handleChange}
      />
      <input
        type='text'
        name='realName'
        placeholder='realName'
        value={formData.realName}
        onChange={handleChange}
      />
      <input
        type='text'
        name='origin'
        placeholder='origin'
        value={formData.origin}
        onChange={handleChange}
      />
      <input
        type='text'
        name='description'
        placeholder='description'
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type='text'
        name='image'
        placeholder='image URL'
        value={formData.image}
        onChange={handleChange}
      />
      
      <button 
          type='submit'>
          Get Heroes
      </button>
    </form>
  )
}

export default AddForm