import Product from "../product"
import SectionTitle from "../section-title"

const ProductCate  =(props) => {
    const {Sanpham} = props;
    return (
        <>
            {Sanpham.map((item) => {
                console.log(item);
            })}
            <SectionTitle/>
            <Product />
        </>
    )
}
export default ProductCate