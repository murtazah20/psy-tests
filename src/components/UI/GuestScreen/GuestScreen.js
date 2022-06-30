import React, { Component } from 'react'
import styles from './GuestScreen.css'
import ItemsList from './ItemsList/ItemsList'
import MainQuiz from '../../../containers/MainQuiz'
import { connect } from 'react-redux'
import { fetchAllTestsTitles, testID } from '../../../store/actions/guestScreenActions'

class GuestScreen extends Component {

    componentDidMount() {
        this.props.fetchAllTestsTitles()
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.guestScreen
                        ?
                        <div className={styles.GuestScreen}>
                            <h1>В системе доступны следующие тесты :</h1>
                            <ItemsList
                                onClick={this.props.testID}
                                allTitles={this.props.allQuestionnaireTitles}
                            />
                        </div>
                        :
                        <MainQuiz
                            testId={this.props.testId}
                        />
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        guestScreen: state.allTests.guestScreen,
        allQuestionnaireTitles: state.allTests.allQuestionnaireTitles,
        testId: state.allTests.testId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllTestsTitles: () => dispatch(fetchAllTestsTitles()),
        testID: () => testID()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestScreen) 