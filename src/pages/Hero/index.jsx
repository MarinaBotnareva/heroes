import React, {useMemo, useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroesRequest, createHeroRequest, deleteHeroRequest, patchHeroRequest, incrementAction, decreaseAction } from '../../store/actions/actionCreators';

function HeroPage (props) {
    const heroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const [formData, setForm] = useState({
        nickname: '',
        realName: '',
        origin: '',
        description: '',
        image: ''
      });  
    const [edits, setEdits] = useState({show: false })      
      
    function handleChange ({ target: { name, value } }) {
        setForm(s => ({ ...s, [name]: value }))
      }

      function startEditing ({ target: { name }}) {
        const result = heroes.list.map((hero)=>{if(hero.id === Number(name)){ return hero}});
        const hero = result.filter(n => n)
        setEdits(s => ({...s, ...hero[0], show: true}));
      }

      function handleEdit ({ target: { name, value } }) {
        setEdits(s => ({ ...s, [name]: value }))
      }

      const actions = useMemo(
        () =>
            bindActionCreators(
                {
                    getHeroesRequest,
                    createHeroRequest,
                    deleteHeroRequest,
                    patchHeroRequest,
                    incrementAction,
                    decreaseAction
                },
                dispatch
            ),
        [dispatch]
    );

    function loadHeroes () {
      const page = heroes.page;
      actions.getHeroesRequest(page);
    }

    function loadnextPage () {
      if (heroes.list.length >= 10){
        actions.incrementAction();
      } 
      } 

      function loadprevPage () {
        if (heroes.page > 1){
          actions.decreaseAction();
        } 
      } 

    useEffect(() => {
        loadHeroes();
  }, [actions, heroes.page, heroes.list]);

    function onSubmit (e) {
      e.preventDefault();
      
      actions.createHeroRequest(formData)

      setForm(s => ({ ...s, 
        nickname: '',
        realName: '',
        origin: '',
        description: '',
        image: '' }))
    }

    function handleDeleteHero (index) {
      actions.deleteHeroRequest(index)
    }

    function handlePatcheHero (id, args) {
      actions.patchHeroRequest({payload: {id, args}})
    }
    
    return (
        <div>
          <form>
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
                type='submit' 
                onClick={onSubmit}>
                Get Heroes
            </button>
          </form>
          <button name='prev' onClick={()=>{loadprevPage()}}>{'<'}</button>
    {heroes.page}
    <button name='next' onClick={()=>{loadnextPage()}}>{'>'}</button>
            <ul>
                {heroes.list.map(h => (
                 
                    <li key={h.id}>
                        <div>
                        {h.nickname} ({h.realName})
                        </div>
                        <img src={h.image}  alt='photo'/>
                        <button onClick={()=>{handleDeleteHero(h.id)}}>X</button>
                        <button name={h.id} onClick={startEditing}>edit</button>
                    </li>
                ))}
            </ul>
            <form className={edits.show === true ? 'editForm' : 'hide'}>
              <input
                type='text'
                name='nickname'
                placeholder='nickname'
                value={edits.nickname}
                onChange={handleEdit}
              />
              <input
                type='text'
                name='realName'
                placeholder='realName'
                value={edits.realName}
                onChange={handleEdit}
              />
              <input
                type='text'
                name='origin'
                placeholder='origin'
                value={edits.origin}
                onChange={handleEdit}
              />
              <input
                type='text'
                name='description'
                placeholder='description'
                value={edits.description}
                onChange={handleEdit}
              />
              <input
                type='text'
                name='image'
                placeholder='image URL'
                value={edits.image}
                onChange={handleEdit}
              />
              <button onClick={()=>{handlePatcheHero(edits.id, edits)}}>Y</button>
        </form>
      </div>
    );
}

export default HeroPage;
