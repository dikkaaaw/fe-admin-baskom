const Table = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-[#EBF3FC] text-left text-sm font-normal font-poppins">
            <tr className="text-center h-9">
              <th>ID</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Metode Pembayaran</th>
              <th>Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody className="text-center font-poppins">
            <tr className="h-14">
              <td className="text-xs font-bold text-[#4E5566]">johndoe123</td>
              <td className="text-xs font-bold text-[#4E5566]">Promosi</td>
              <td className="text-sm font-bold uppercase text-dark-green">
                SUDAH BAYAR
              </td>
              <td className="text-xs font-bold text-[#202244]">Credit Card</td>
              <td className="text-xs font-bold text-[#4E5566]">
                21 Sep, 2023 at 2:00 AM
              </td>
            </tr>
            <tr className="h-14">
              <td className="text-xs font-bold text-[#4E5566]">supermanxx</td>
              <td className="text-xs font-bold text-[#4E5566]">Promosi</td>
              <td className="text-sm font-bold text-red-500 uppercase">
                BELUM BAYAR
              </td>
              <td className="text-xs font-bold text-[#202244]">-</td>
              <td className="text-xs font-bold text-[#4E5566]">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
