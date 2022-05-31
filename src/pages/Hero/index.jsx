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
      
    function handleChange ({ target: { name, value } }) {
        setForm(s => ({ ...s, [name]: value }))
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
      
        if (heroes.page < heroes.list.length){
        actions.incrementAction()
        loadHeroes();
        } 
      } 

      function loadprevPage () {
      
        if (heroes.page > 1){
        actions.decreaseAction()
        loadHeroes();
        } 
      } 

    useEffect(() => {
       if(0 !== heroes.page){
        loadHeroes();
      }
  }, [actions]);

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
    console.log(heroes.list.length)
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
          <button name='prev' onClick={loadprevPage}>{'<'}</button>
    {heroes.page}
    <button name='next' onClick={loadnextPage}>{'>'}</button>
            <ul>
                {heroes.list.map(h => (
                    <li key={h.id}>
                        <div>
                        {h.nickname} ({h.realName})
                        </div>
                        <img src={h.image}  alt='photo'/>
                        <button onClick={()=>{handleDeleteHero(h.id)}}>X</button>
                        <button onClick={()=>{handlePatcheHero(h.id, formData)}}>Y</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HeroPage;
