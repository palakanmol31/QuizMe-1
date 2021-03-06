import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class BackendService {

    elasticSearchUrl = 'https://search-aw-service-gj2acwxzzkqsr5pnvwy45jsebi.us-east-1.es.amazonaws.com/java_books/';
    baseUrl = 'http://quizme-services.us-east-1.elasticbeanstalk.com';
    header = new Headers();

    constructor(private http: Http, private router: Router) {
        this.http = http;
    }

    getRecommendation(data) {
        return this.http.get(this.elasticSearchUrl + "_search?q=" + data)
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }

    authUser(email: string, password: any) {
        this.header = new Headers();
        this.header.append('email', email);
        this.header.append('password', password);
        return this.http.get(this.baseUrl + '/user/login', {headers: this.header})
            .map((response: Response) => response.json());
    }

    createUser(payLoad: any) {
        console.log(JSON.stringify(payLoad));
        return this.http.post(this.baseUrl + '/user/registration', JSON.stringify(payLoad))
            .map((response: Response) => {
                return response.json();
            });
    }

    getUser(userId: any) {
        return this.http.get(this.baseUrl + '/user/' + userId)
            .map((response: Response) => {
                return response.json();
            });
    }

    getAllUsers() {
        return this.http.get(this.baseUrl + '/user/all')
            .map((response: Response) => {
                return response.json();
            });
    }

    getQuizQuestions(userId) {
        return this.http.get(this.baseUrl + '/quiz/' + userId)
            .map(
                (response: Response) => {
                    return response.json();
                });
    }

    submitAnswers(answer) {
        return this.http.post(this.baseUrl + '/quiz', answer)
            .map((response: Response) => {
                return response.json();
            });
    }

    getQuizHistory(userId) {
        return this.http.get(this.baseUrl + '/quizHistory/user/' + userId)
            .map((response: Response) => {
                return response.json();
            });
    }

    getUserProficiency(userId: any) {
        return this.http.get(this.baseUrl + '/userProficiency/' + userId)
            .map((response: Response) => {
                return response.json();
            });
    }

    putUserProficiency(userId: any, payload: any) {
        return this.http.put(this.baseUrl + '/userProficiency/' + userId, JSON.stringify(payload))
            .map((response: Response) => {
                return response.json();
            });
    }

    getCategoryAnalystics(userId: any){
        this.header = new Headers();
        this.header.append('X-user-id', userId);
        return this.http.get(this.baseUrl + '/analytics/category/', {headers: this.header}).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    getKnowledgeValues(userId: any) {
        return this.http.get(this.baseUrl + '/userProficiency/knowledge/' + userId).map(
            (response: Response) => {
                console.log(response);
                return response.json();
            }
        );
    }

    getQuestionHistory(quizId, userId) {
        this.header = new Headers();
        this.header.append('X-quiz-id', quizId);
        this.header.append('X-user-id', userId);
        return this.http.get(this.baseUrl + '/quiz/history', {headers: this.header})
            .map((response: Response) => response.json());
    }

    getQuestionDiscussion(questionId) {
        return this.http.get(this.baseUrl + '/discussion/' + questionId).map(
            (response) => {
                return response.json();
            }
        );
    }

    postDiscussion(payLoad: any) {
        this.header = new Headers();
        this.header.append('Content-Type', 'application/json');
        console.log((payLoad));
        return this.http.post(this.baseUrl + '/discussion/post', JSON.stringify(payLoad), {headers: this.header}).map(
            (response) => {
                return response;
            }
        );
    }

    incrementUpvote(postId) {
        return this.http.put(this.baseUrl + '/discussion/upvote/' + postId, {}).map(
            (response) => {
                return response.json();
            }
        );
    }

    update(payLoad, userId){
        return this.http.put(this.baseUrl+'/user/update/'+userId, JSON.stringify(payLoad)).map(
            (response)=>{
                return response.json();
            }
        );
    }

    incrementDownVote(postId) {
        return this.http.put(this.baseUrl + '/discussion/downvote/' + postId, {}).map(
            (response) => {
                return response.json();
            }
        );
    }
}
