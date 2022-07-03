import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import CartTableRow from './CartTableRow';


const StyledCartTable = styled.table``;
const StyledCartTableHeaderCell = styled.th`
    padding-left: ${({theme}) => theme.coreSpace * 2}px;
    padding-right: ${({theme}) => theme.coreSpace * 2}px;
`;
export const StyledCartTableTextAlignCenterCell = styled.td`
    text-align: center;
`;
export const StyledCartTableTextAlignRightCell = styled.td`
    text-align: center;
`;

const CartTable = ({editable, showUnitPriceColumn}) => {
    
    const itemsOnCart = useSelector(({cart}) => {
        if (cart.items) {
            return Object.values(cart.items);
        }
        return [];
    });

    const total = itemsOnCart.reduce((count, [quantity, item]) => 
        count + (quantity * item.price), 0);

    return (
        <StyledCartTable>
            <thead>
                <tr>
                    {editable ? <th/> : null}
                    <th/>
                    <StyledCartTableHeaderCell>
                        Name
                    </StyledCartTableHeaderCell>
                    {showUnitPriceColumn
                        ?
                        <StyledCartTableHeaderCell>
                            Unit price
                        </StyledCartTableHeaderCell>
                        :
                        null
                    }
                    <StyledCartTableHeaderCell>
                        Quantity
                    </StyledCartTableHeaderCell>
                    <StyledCartTableHeaderCell>
                        Subtotal
                    </StyledCartTableHeaderCell>
                </tr>
            </thead>
            <tbody>
                {
                    itemsOnCart.map(([quantity, item]) => (
                        <CartTableRow
                            key={item.id}
                            editable={editable}
                            quantity={quantity}
                            item={item}
                            showUnitPriceColumn={showUnitPriceColumn}
                        />
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    {editable ? <td/> : null}
                    <td/>
                    <td/>
                    {showUnitPriceColumn
                        ? <td/>
                        : null
                    }
                    <StyledCartTableTextAlignCenterCell>
                        <b>
                            Total:
                        </b>
                    </StyledCartTableTextAlignCenterCell>
                    <StyledCartTableTextAlignRightCell>
                        $ {total}
                    </StyledCartTableTextAlignRightCell>
                </tr>
            </tfoot>
        </StyledCartTable>
    )
};

CartTable.propTypes = {
    editable: PropTypes.bool,
    showUnitPriceColumn: PropTypes.bool,
}

CartTable.defaultProps = {
    editable: false,
    showUnitPriceColumn: true,
}

export default CartTable;