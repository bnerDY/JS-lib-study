/**
 * Created by dy on 9/21/16.
 */

// a reducer takes in two things:
// 1. the actions
// 2. copy of current state

function posts(state = [], action){
    console.log("the post will change");
    console.log(state, action);
    return state;
}

export default posts;