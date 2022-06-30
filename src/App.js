import React from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import MainQuiz from './containers/MainQuiz'
import GuestScreen from './components/UI/GuestScreen/GuestScreen'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizeCreator/QuizCreator'


import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          
          <Route path= "/auth" component={Auth}/>
          
          <Route path= "/create-quize" component={QuizCreator}/>
          <Route path= "/quiz/:id"  component={MainQuiz}/>
          <Route path= "/" component={GuestScreen}/>

        </Switch>
      </Layout>
    </div>
  );
}

export default App;


