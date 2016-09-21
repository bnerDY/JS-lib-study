/**
 * Created by dy on 9/21/16.
 */
// a reducer takes in two things:
// 1. the actions
// 2. copy of current state

function comments(state = [], action){
    console.log(state, action);
    return state;
}

export default comments;