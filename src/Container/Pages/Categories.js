import React, { useEffect } from 'react';
import Header from '../../Container/Top Nav Bar/Header';
import Index2 from '../../Container/Side Nav Bar/Index2';
import Search from '../Search Button/Search';
import Footer from '../Footer/Footer';
import './Categories.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions'
import { Link } from 'react-router-dom';

const Categories = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <div key={category.name}>
                    {
                        category.parentId ? <Link to={category.slug}>{category.name}</Link> :
                            <div className="cardNew1">
                                <img src={`https://api.tilakshringar.com${category.categoryImage}`} alt='HR' />
                                <div className="figCaption" style={{ textAlign: "right" }}>
                                    <h2>{category.name}</h2>
                                </div>
                            </div>

                    }
                </div>
            )
        }
        return myCategories;
    }
    const renderNull = () => {
        let nullCategory = [];
        nullCategory.push(
            <div className="nullCategories">
                <h2>No Categories</h2>
            </div>
        )
        return nullCategory;
    }
    return (
        <div>
            <Header />
            <Index2 />
            <div class='shop'>
                < Search />
            </div>
            <h2 class='categoryheadlinee'>our categories..</h2>
            <div className="category_card">
                {category.categories.length > 0 ? renderCategories(category.categories) : renderNull()}
            </div>
            <div className='abqucard'>
                <div className='abcard'>
                    <span><a href='/about' style={{ color: '#4D4D4D' }}>ABOUT</a></span>
                </div>
                <div className='qucard'>
                    <span><a href='/query' style={{ color: '#4D4D4D' }}>QUERY</a></span>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Categories;
