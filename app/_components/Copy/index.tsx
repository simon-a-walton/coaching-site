interface iCopy {
    content: string;
}

export default function Copy({ content }: iCopy) {
    return (
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}