import React, {useMemo, useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroesRequest, createHeroRequest, deleteHeroRequest, patchHeroRequest, incrementAction, decreaseAction } from '../../store/actions/actionCreators';
import EditForm from '../../components/EditForm';
import AddForm from '../../components/AddForm';

function HeroPage (props) {
    const heroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();
      
    const [edits, setEdits] = useState({show: false }) 

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

    useEffect(() => {
      loadHeroes();
      }, [actions, heroes.page, heroes.list]
    );

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

    function startEditing ({ target: { name }}) {
      const hero = heroes.list.find((hero)=>{if(hero.id === Number(name)){ return hero}});
      setEdits(s => ({...s, ...hero, show: true}));
    }   

    function handleDeleteHero (index) {
      actions.deleteHeroRequest(index)
    }
    
    return (
      <div>
        <AddForm actions={actions}/>
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
            <EditForm actions={actions} setEdits = {setEdits} edits={edits}/>
      </div>
    );
}

export default HeroPage;
