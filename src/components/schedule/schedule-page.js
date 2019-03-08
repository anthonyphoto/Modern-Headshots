import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../user/requires-login';
import {fetchProtectedData} from '../../actions/protected-data';

export class SchedulePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {

        return (
            <div className="row fi">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <div className='test'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae praesentium quo libero enim nesciunt repellat, dolorem facere ex. Ipsa maxime possimus odio alias dignissimos eos molestiae fugit provident sunt obcaecati.
    Assumenda magnam minima nam modi vel voluptatem tenetur nulla, sequi quibusdam vitae cum soluta reprehenderit inventore, dicta esse voluptatibus hic officiis quis iusto id itaque pariatur earum? Totam, incidunt excepturi?
    Mollitia, temporibus repellat obcaecati enim aut recusandae. Distinctio eaque repellendus quae animi nihil modi, nobis quisquam iusto debitis, nemo laudantium error officiis ea quis eligendi non aperiam. Ea, libero obcaecati!
    Quia aspernatur facilis, dignissimos voluptatem at deleniti, tenetur corrupti id sit perferendis ad officia ut sunt vero aliquam accusantium voluptas corporis. Repellat, nemo quia placeat fuga nesciunt quam doloribus praesentium.
            </div>

            <div className='test'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae praesentium quo libero enim nesciunt repellat, dolorem facere ex. Ipsa maxime possimus odio alias dignissimos eos molestiae fugit provident sunt obcaecati.
    Assumenda magnam minima nam modi vel voluptatem tenetur nulla, sequi quibusdam vitae cum soluta reprehenderit inventore, dicta esse voluptatibus hic officiis quis iusto id itaque pariatur earum? Totam, incidunt excepturi?
    Mollitia, temporibus repellat obcaecati enim aut recusandae. Distinctio eaque repellendus quae animi nihil modi, nobis quisquam iusto debitis, nemo laudantium error officiis ea quis eligendi non aperiam. Ea, libero obcaecati!
    Quia aspernatur facilis, dignissimos voluptatem at deleniti, tenetur corrupti id sit perferendis ad officia ut sunt vero aliquam accusantium voluptas corporis. Repellat, nemo quia placeat fuga nesciunt quam doloribus praesentium.
            </div>
            <div className='test'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae praesentium quo libero enim nesciunt repellat, dolorem facere ex. Ipsa maxime possimus odio alias dignissimos eos molestiae fugit provident sunt obcaecati.
    Assumenda magnam minima nam modi vel voluptatem tenetur nulla, sequi quibusdam vitae cum soluta reprehenderit inventore, dicta esse voluptatibus hic officiis quis iusto id itaque pariatur earum? Totam, incidunt excepturi?
    Mollitia, temporibus repellat obcaecati enim aut recusandae. Distinctio eaque repellendus quae animi nihil modi, nobis quisquam iusto debitis, nemo laudantium error officiis ea quis eligendi non aperiam. Ea, libero obcaecati!
    Quia aspernatur facilis, dignissimos voluptatem at deleniti, tenetur corrupti id sit perferendis ad officia ut sunt vero aliquam accusantium voluptas corporis. Repellat, nemo quia placeat fuga nesciunt quam doloribus praesentium.
            </div>
            <div className='test'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae praesentium quo libero enim nesciunt repellat, dolorem facere ex. Ipsa maxime possimus odio alias dignissimos eos molestiae fugit provident sunt obcaecati.
    Assumenda magnam minima nam modi vel voluptatem tenetur nulla, sequi quibusdam vitae cum soluta reprehenderit inventore, dicta esse voluptatibus hic officiis quis iusto id itaque pariatur earum? Totam, incidunt excepturi?
    Mollitia, temporibus repellat obcaecati enim aut recusandae. Distinctio eaque repellendus quae animi nihil modi, nobis quisquam iusto debitis, nemo laudantium error officiis ea quis eligendi non aperiam. Ea, libero obcaecati!
    Quia aspernatur facilis, dignissimos voluptatem at deleniti, tenetur corrupti id sit perferendis ad officia ut sunt vero aliquam accusantium voluptas corporis. Repellat, nemo quia placeat fuga nesciunt quam doloribus praesentium.
            </div>
    

            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(SchedulePage));
