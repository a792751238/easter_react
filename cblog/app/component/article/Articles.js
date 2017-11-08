/**
 * Created by easterCat on 2017/10/13.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Card, Col, Row, Pagination, Icon, message} from 'antd';
import {getAllArticles, deleteArticleById} from './article.actions';

class Articles extends React.Component {

    constructor(props) {
        super(props);

        this.goToArticle = (id) => {
            const {history} = this.props;
            if (id) {
                history.push(`/home/article/${id}`);
            } else {
                message.error('获取文章id失败');
            }
        };

        //页码改变后的回调函数
        this.changePageNum = (page, pagesize) => {
            let where = {
                limit: 10,
                skip: (page - 1) * 10
            };
            this.props.getAllArticles(where);
        };

        this.deleteOneArticle = (e, id) => {
            e.stopPropagation();
            this.props.deleteArticleById(id)
                .then(() => message.success('删除文章成功'));
        };
    }

    componentWillMount() {
        //初始化加载前10篇文章
        let where = {
            limit: 10,
            skip: 0
        };
        this.props.getAllArticles(where);
    }

    render() {
        const {articles, count} = this.props;
        return (
            <div className="articles-content">
                {
                    articles && articles.size ? articles.map(i => {
                        return <div key={i.get('_id')} className="articles-item"
                                    onClick={() => this.goToArticle(i.get('_id'))}>
                            <div className="item-title">
                                {i.get('title')}
                            </div>
                            <div className="item-detail">
                                Create by easterCat at {new Date(i.get('createDate')).toLocaleString()}
                                {
                                    i.get('pv') ? <span style={{marginLeft: 30}}>访问次数:{i.get('pv')}</span> : null
                                }
                            </div>
                            <div dangerouslySetInnerHTML={{__html: i.get('content')}}
                                 className="item-content markdown-body">
                            </div>
                            <div className="item-operate">
                                <Icon className="delete-btn" type="delete"
                                      onClick={(e) => this.deleteOneArticle(e, i.get('_id'))}/>
                            </div>
                        </div>
                    }) : null
                }
                <div className="plu-Pagination">
                    <Pagination defaultCurrent={1} total={count} onChange={this.changePageNum}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.get('article').get('articles'),
        count: state.get('article').get('articles_count'),
    }
};

const mapActionCreators = {
    getAllArticles,
    deleteArticleById
};
export default connect(mapStateToProps, mapActionCreators)(Articles);
