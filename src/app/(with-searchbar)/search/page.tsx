export default function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
    };
}) {
    return <div>검색하신 검색어는 = {searchParams.q}</div>;
}
