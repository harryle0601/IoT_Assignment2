// import React from "react";
// import { connect } from 'react-redux'

// class ViewStatistics extends React.Component {
//     constructor() {
//         super();
//         this.state = {
            
//         }
//     }
//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// } 

// const mapDispatchToProps = (dispatch) => {
    
// }

// const mapStateToProps = (state) => {
//     const cu = state.firestore.ordered.currentUser
//     const currentUser = cu ? cu[0] : null
//     return {
//         currentUser: currentUser,
//         auth: state.firebase.auth,
//         cars: state.firestore.ordered.cars,
//         rental: state.firestore.ordered.rental,
//         issues: state.firestore.ordered.issues,
//         users: state.firestore.ordered.users
//     }
// }

// export default compose(
//     connect(mapStateToProps, null),
//     firestoreConnect((props) => {
//         if (!props.auth.uid) return [];
//         else return [
//             { collection: 'cars' },
//             { collection: 'rental' },
//             { collection: 'issues' },
//             { collection: 'users'}
//         ]
//     }),
// )(withStyles(useStyles)(AdminDashboard))
