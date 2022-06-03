import React from "react" 

function EditForm (props) {
  
  function handleEdit ({ target: { name, value } }) {
    props.setEdits(s => ({ ...s, [name]: value }))
  } 

  function handlePatcheHero (id, args) {
    props.actions.patchHeroRequest({payload: {id, args}})
  }

  return (
    <form className={props.edits.show === true ? 'editForm' : 'hide'}>
      <input
        type='text'
        name='nickname'
        placeholder='nickname'
        value={props.edits.nickname}
        onChange={handleEdit}
      />
      <input
        type='text'
        name='realName'
        placeholder='realName'
        value={props.edits.realName}
        onChange={handleEdit}
      />
      <input
        type='text'
        name='origin'
        placeholder='origin'
        value={props.edits.origin}
        onChange={handleEdit}
      />
      <input
        type='text'
        name='description'
        placeholder='description'
        value={props.edits.description}
        onChange={handleEdit}
      />
      <input
        type='text'
        name='image'
        placeholder='image URL'
        value={props.edits.image}
        onChange={handleEdit}
      />
      <img src={props.edits.image}  alt='photo'/>
      <button onClick={()=>{handlePatcheHero(props.edits.id, props.edits)}}>Y</button>
    </form>
  )
}

 export default EditForm