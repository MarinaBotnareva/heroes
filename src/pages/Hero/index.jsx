import React, {useMemo, useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroesRequest, createHeroRequest, deleteHeroRequest, patchHeroRequest } from '../../store/actions/actionCreators';

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
                    patchHeroRequest
                },
                dispatch
            ),
        [dispatch]
    );

    useEffect(() => {
      actions.getHeroesRequest();
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

    function handlePatcheHero (index, key, args) {
      actions.patchHeroRequest(index, key, args)
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
            <ul>
                {heroes.list.map(h => (
                    <li key={h.id}>
                        <div>
                        {h.nickname} ({h.realName})
                        </div>
                        <img src={h.image}  alt='photo'/>
                        <button onClick={()=>{handleDeleteHero(h.id)}}>X</button>
                        <button onClick={()=>{handlePatcheHero(h.id, 'nickname', 'Получилось')}}>Y</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HeroPage;


    
  
    
  
    
  
   