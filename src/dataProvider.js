import {gql} from "@apollo/client";
import axios from "axios";
import buildGraphQLProvider from 'ra-data-graphql-simple';
const GRAPHQL_URI = "http://localhost:8080/graphql";


const myBuildQuery = (fetchType, resource, params) => {
    console.log(`${fetchType} for ${resource}`);
    if (fetchType === "CREATE") {
        const data = params.data;

        switch (resource) {
            case "Routine":
                const batch = params.data.batch;
                const faculty = params.data.faculty;
                const isDraft = params.data.isDraft;

                let schedule = {
                    ...data.schedule,
                };
                delete schedule.__typename;
                for (let key in schedule) {
                    console.log(key);
                    if (Array.isArray(schedule[key])) {
                        schedule[key] = schedule[key].map((d) => {
                            delete d.__typename;
                            return d;
                        });
                    }
                }
                console.log(schedule);
                const create_routine = gql`
                fragment DayScheduleFields on SubjectSchedule {
                  subject
                  startTime
                  endTime
                }
                mutation createRoutine($batch :Int!, $faculty :Faculty!, $schedule : InputDaySchedule!, $isDraft : Boolean!) {
                  routine {
                    createRoutine(routine: {
                      batch : $batch,
                      faculty : $faculty,
                      schedule : $schedule,
                      isDraft : $isDraft
                    }){
                       id
                       isDraft
                       batch
                       faculty
                       schedule{
                           sun { ...DayScheduleFields }
                           mon { ...DayScheduleFields }
                           tue { ...DayScheduleFields }
                           wed { ...DayScheduleFields }
                           thu { ...DayScheduleFields }
                           fri { ...DayScheduleFields }
                       }
                    }
                  }
                }`;
                return {
                    query: create_routine,
                    variables: {
                        batch,
                        faculty,
                        schedule,
                        isDraft
                    },
                    parseResponse: response => {
                        return {
                            data: {
                                ...response.data.routine.createRoutine
                            },
                        };
                    },
                };
            case "User":
                const create_user = gql`
                   mutation createUser(
                        $fullName: String!,
                        $primaryEmail: String!,
                        $password: String!,
                        $phoneNumber: String!,
                        $userRole: UserRole!,
                        $secondaryEmail: String,
                        $gender: Gender,
                        $batch: Int,
                        $imageUrl: String,
                        $userType: UserType,
                        $faculty: Faculty
                      ) {
                        user {
                          createUser(newUser: {
                            fullName: $fullName,
                            primaryEmail: $primaryEmail,
                            password: $password,
                            phoneNumber: $phoneNumber,
                            userRole: $userRole,
                            secondaryEmail: $secondaryEmail,
                            gender: $gender,
                            batch: $batch,
                            imageUrl: $imageUrl,
                            userType: $userType,
                            faculty: $faculty,
                          })
                        }
                      }
                `;

                return {
                    query: create_user,
                    variables: {
                        fullName: data.fullName,
                        primaryEmail: data.primaryEmail,
                        password: data.password,
                        phoneNumber: data.phoneNumber,
                        userRole: data.userRole,
                        secondaryEmail: data.secondaryEmail,
                        gender: data.gender,
                        batch: data.batch,
                        imageUrl: data.imageUrl,
                        userType: data.userType,
                        faculty: data.faculty,
                    },
                    parseResponse: response => {
                        console.log(response);
                        return {
                            data: {
                                id: response.data.user.createUser,
                            },
                        };
                    },
                };
        }
    }
    else if (fetchType === 'GET_LIST') {
        let page = params.pagination.page;
        let perPage = params.pagination.perPage;
        switch (resource) {
            case "Routine":
                const get_list_routine = gql`
                   query all${resource}s {
                      routine {
                         all${resource}s(page : ${page}, perPage : ${perPage}) {
                            id
                            isDraft
                            batch
                            faculty

                         }
                      }
                   }
                `;
                return {
                    query: get_list_routine,
                    variables: {}, // You can add variables if needed
                    parseResponse: response => {
                        return {
                            data: response.data.routine.allRoutines,
                            total: response.data.routine.allRoutines.length,
                        };
                    },
                };
            case "Event":
                const get_list_event = gql`
                   query all${resource}s {
                      all${resource}s {
                        title
                        date
                        id
                        registrants
                        noOfRegistrants
                        categories
                        location
                        description
                      }
                   }
              `;
                return {
                    query: get_list_event,
                    variables: {}, // You can add variables if needed
                    parseResponse: response => {
                        console.log(response);
                        return {
                            data: response.data[`all${resource}s`],
                            total: response.data[`all${resource}s`].length,
                        };
                    },
                };
            case "User":
                const get_list_user = gql`
                    query allUsers($page : Int, $perPage : Int){
                        user{
                            allUsers(page : $page, perPage : $perPage) {
                                id,
                                fullName,
                                primaryEmail,
                            }
                        }
                   }
              `;
                return {
                    query: get_list_user,
                    variables: {page, perPage}, // You can add variables if needed
                    parseResponse: response => {
                        console.log(response);
                        return {
                            data: response.data.user.allUsers,
                            total: response.data.user.allUsers.length,
                        };
                    },
                };
        }
    } else if (fetchType === "GET_ONE") {
        switch (resource) {
            case "Routine":
                const get_one_routine = gql`
                    fragment DayScheduleFields on SubjectSchedule {
                      subject
                      startTime
                      endTime
                    }

                   query getRoutine {
                      routine {
                        Routine(id : "${params.id}") {
                            id
                            isDraft
                            batch
                            faculty
                            schedule{
                                sun { ...DayScheduleFields }
                                mon { ...DayScheduleFields }
                                tue { ...DayScheduleFields }
                                wed { ...DayScheduleFields }
                                thu { ...DayScheduleFields }
                                fri { ...DayScheduleFields }
                            }
                         }
                      }
                   }
                `;
                return {
                    query: get_one_routine,
                    variables: {}, // You can add variables if needed
                    parseResponse: response => {
                        return {
                            data: response.data.routine.Routine,
                        };
                    },
                };
            case "User":
                const get_one_user = gql`
                  query getUser($id: String, $primaryEmail : String) {
                     user {
                       User(
                          primaryEmail : $primaryEmail,
                          id : $id,
                         ){
                            id
                            fullName
                            primaryEmail
                            secondaryEmail
                            gender 
                            phoneNumber
                            registeredEvents
                            certificates
                            batch
                            imageUrl
                            userRole
                            faculty
                            userType

                        }
                     }
                  }
               `;
                return {
                    query: get_one_user,
                    variables: {
                        id: params.id,
                    },
                    parseResponse: response => {
                        return {
                            data: response.data.user.User,
                        };
                    },
                };
        }
    } else if (fetchType === 'UPDATE') {
        let data = params.data;
        let schedule = {
            ...data.schedule,
        };
        delete schedule.__typename;
        for (let key in schedule) {
            console.log(key);
            if (Array.isArray(schedule[key])) {
                schedule[key] = schedule[key].map((d) => {
                    delete d.__typename;
                    return d;
                });
            }
        }

        console.log(schedule);
        const update_routine = gql`
            fragment DayScheduleFields on SubjectSchedule {
              subject
              startTime
              endTime
            }
            mutation updateRoutine($id : String!, $batch :Int!, $faculty :Faculty!, $schedule : InputDaySchedule!, $isDraft : Boolean!) {
              routine {
                updateRoutine(id: $id, updatedRoutine: {
                  batch : $batch,
                  isDraft : $isDraft,
                  faculty : $faculty,
                  schedule : $schedule
                }){
                   id
                   batch
                   isDraft
                   faculty
                   schedule{
                       sun { ...DayScheduleFields }
                       mon { ...DayScheduleFields }
                       tue { ...DayScheduleFields }
                       wed { ...DayScheduleFields }
                       thu { ...DayScheduleFields }
                       fri { ...DayScheduleFields }
                   }
                }
              }
            }`;

        return {
            query: update_routine,
            variables: {
                id: params.data.id,
                batch: params.data.batch,
                faculty: params.data.faculty,
                isDraft: params.data.isDraft,
                schedule: schedule
            }, // You can add variables if needed
            parseResponse: response => {
                console.log(response);
                return {
                    data: {
                        ...response.data.routine.updateRoutine
                    },
                };
            },
        };
    } else if (fetchType === 'DELETE') {
        switch (resource) {
            case "Routine":
                const delete_mutation = gql`
                    mutation deleteRoutine($id: String!) {
                        routine{
                            delete${resource}(id: $id)
                        }
                    }
                `;
                return {
                    query: delete_mutation,
                    variables: {id: params.id},
                    parseResponse: response => {
                        if (response.data.routine.deleteRoutine > 0) {
                            return {data: {id: params.id}};
                        }
                        throw new Error(`Could not delete ${resource}`);
                    },
                };
        }

    } else if (fetchType === 'GET_ONE') {
        console.log('I AM HERE TO GET ONE');
    }
    return null; // Return null for unsupported fetch types
};


const graphqlProvider = (access_token) => {

    console.log(access_token);
    return buildGraphQLProvider({
        introspection: false,
        clientOptions: {
            uri: GRAPHQL_URI,
            headers: {
                "Authorization": access_token
            }
        },
        buildQuery: (_) => myBuildQuery
    });
}


export default graphqlProvider;
