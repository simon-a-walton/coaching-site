interface iCopy {
    content: string;
}

export default function Copy({ content }: iCopy) {
    return (
        <div contentEditable="false" dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}