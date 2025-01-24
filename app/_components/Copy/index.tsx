interface iCopy {
    content: string;
}

export default function Copy({ content }: iCopy) {
    return (
        <div contentEditable="false" className="copyblock" dangerouslySetInnerHTML={{ __html: content }} />
    )
}