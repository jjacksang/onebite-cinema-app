export default function Page({ params }: { params: { id: string | string[] } }) {
    return (
        <div>
            <h2>Movie id {params.id}</h2>
        </div>
    );
}
