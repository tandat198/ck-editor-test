import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Badge } from "shards-react";
import { deleteTutorial } from "../../redux/tutorials/actions";
import CardLoader from "../CardLoader";
import moment from "moment";

class TutorialsList extends Component {
    delTurorial = (id) => {
        this.props.delTurorialReq(id);
    };

    render() {
        const { tutorials, isLoading, isSearching, pageSize = 8 } = this.props;

        return (
            <div className='d-flex flex-wrap'>
                {isLoading || isSearching ? <CardLoader numberOfCards={pageSize} /> : tutorials.map((tutorial) => (
                    <Link
                        to={`/tutorials/${tutorial.id}`}
                        className='card-item text-decoration-none text-dark'
                        key={tutorial.id}
                    >
                        <img className='mr-3' src={tutorial.thumbnailUrl} alt='' />
                        <div className='d-flex flex-column'>
                            <span className='tutorial-title'>{tutorial.title}</span>
                            <span className='tutorial-description'>{tutorial.description}</span>
                            <span className='mt-2'>
                                {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                    ? moment(tutorial.createdAt).fromNow()
                                    : moment(tutorial.createdAt).format("MMMM DD")}
                            </span>
                            <div>
                                {tutorial.tags.map((tag) => (
                                    <Badge key={tag} className='mr-2' pill theme='secondary'>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    isLoading: state.tutorial.isLoading,
    isSearching: state.tutorial.isSearching,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    delTurorialReq: (id) => dispatch(deleteTutorial(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialsList));