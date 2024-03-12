import React from "react";

export default function SizeChart({ handleFilterSizeChange, selectedFilterSize }) {
    const filterSize = ['XS','S', 'M', 'L', 'X','XX', 'XL', 'XXL'];

  return (
    <>
      <div>
        <h6>SIZE</h6>
        <div className="size-chartFilter">
          <ul>
            {filterSize.map((size) => (
              <li>
                <input
                  type="radio"
                  id={`size${size}`}
                  name="size"
                  value={size}
                  onChange={handleFilterSizeChange}
                  checked={selectedFilterSize === size}
                />
                <label
                  style={{
                    border:
                      selectedFilterSize === size
                        ? "2px solid #117a7a"
                        : "2px solid #b3b3b3",
                  }}
                >
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
