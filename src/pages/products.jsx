
import { useSelector } from "react-redux"
import ProductItem from "./components/productItem";

export default function Products() {
    const mainBox = {
        display: "flex",
        flexWrap: "wrap"
    }

    const products = useSelector((state) => state.products);

    return (
        <>
            <h1>Products</h1>
            {products &&
                <div style={mainBox}>
                    {products.map((product, i) => {
                        return (
                            <ProductItem
                                key={i}
                                p={product}
                            />
                        )
                    })}
                </div>
            }
        </>
    )
};