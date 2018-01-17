import * as React from 'react';

export default GridRow = (props) => {
    const data = props.data;

    return <tr>
        {props.columns.map((col) => {
            let value = data;

            if(value !== null) {
                for (var key of col.key) {
                    value = value !== null && value[key] !== undefined ? value[key] : null;
                }

                if (value === data) {
                    value = null;
                }
            }

            return <td key={data.id + "field" + col.key.join('') + value}>
                {value}
            </td>;
        })}
    </tr>;
}