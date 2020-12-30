import React, { Component } from 'react'
import WineForm from '../components/WineForm'
import { connect } from 'react-redux'
import { getWines } from '../actions/wineActions'

class WineContainer extends Component {

    componentDidMount() {
        this.props.getWines();
    }

    render() {
        console.log(this)
        if (this.props.loggedInStatus) {

            return (
                <div>
                    <WineForm />
                </div>
            )
        } 

        return (
            <div>
                Sorry
                <button onClick={this.props.history.push('/')}>Back Home</button>
            </div>
        )

    }
}

const mapStateFromProps = (state) => ({ 
    wines: state.wines,
})

const mapDispatchToProps = (dispatch) => ({
    getWines: () => dispatch(getWines()),
})

export default connect(mapStateFromProps, mapDispatchToProps)(WineContainer);
  
